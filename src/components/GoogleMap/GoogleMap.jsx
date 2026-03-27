import cx from 'classnames';
import React from 'react';
import GoogleMapReact from 'google-map-react';
import useSupercluster from 'use-supercluster';

import { ReactComponent as MeasurementIcon } from '../../assets/icons/measurement.svg';

import styles from './GoogleMap.module.scss';

const DEFAULT_OFFSET = { top: 0, bottom: 0, left: 0, right: 0 };
const DEFAULT_CENTER = {
  lat: 51.107883,
  lng: 17.038538,
};

const MapMarker = ({ color, showWarning, className, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={cx(styles.marker, className)} style={{ color }} onClick={onClick}>
    <MeasurementIcon />
    {showWarning && <span className={styles.warning} />}
  </div>
);

const MapCluster = ({ children, onClick }) => (
  // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
  <div className={styles.marker} onClick={onClick}>{children}</div>
);

export const GoogleMap = ({ markers, selected, offset = DEFAULT_OFFSET, onSelect }) => {
  const [map, setMap] = React.useState(null);
  const [maps, setMaps] = React.useState(null);
  const [zoom, setZoom] = React.useState(11);
  const [bounds, setBounds] = React.useState([]);
  const [selectedMarker, setSelectedMarker] = React.useState(selected);

  const selectMarker = React.useCallback((marker) => {
    setSelectedMarker(marker);
    onSelect(marker);

    const { lng, lat } = markers.find(({ id }) => id === marker);
    const x = (offset.right - offset.left) / 2;
    const y = (offset.bottom - offset.top) / 2;

    map.panTo({ lat, lng });
    map.panBy(x, y);
  }, [map, offset, markers, onSelect]);

  const fitBounds = React.useCallback((_map = map, _maps = maps) => {
    if (!markers.length) {
      return;
    }

    const latLngBounds = new _maps.LatLngBounds();
    markers.forEach(({ lng, lat }) => latLngBounds.extend({ lng, lat }));

    _map.fitBounds(latLngBounds, offset);
  }, [map, maps, markers, offset]);

  React.useEffect(() => {
    if (map && selected) {
      selectMarker(selected);
    }
  }, [selected]);

  React.useEffect(() => {
    if (map && maps && markers.length) {
      const isVisible = !!markers.find(({ id }) => id === selected);

      if (selected && isVisible) {
        selectMarker(selected);
      } else {
        fitBounds();
      }
    }
  }, [markers, offset]);

  const onGoogleApiLoaded = React.useCallback((api) => {
    setMap(api.map);
    setMaps(api.maps);
    fitBounds(api.map, api.maps);
  }, [fitBounds]);

  const onChange = React.useCallback((e) => {
    setZoom(e.zoom);
    setBounds([
      e.bounds.nw.lng,
      e.bounds.se.lat,
      e.bounds.se.lng,
      e.bounds.nw.lat,
    ]);
  }, []);

  const { clusters, supercluster } = useSupercluster({
    points: markers.map(({ id, color, showWarning, lat, lng }) => ({
      type: 'Feature',
      properties: { id, color, showWarning },
      geometry: {
        type: 'Point',
        coordinates: [lng, lat],
      },
    })),
    bounds,
    zoom,
    options: { radius: 75, maxZoom: 17 },
  });

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY, libraries: 'places', language: 'pl' }}
      defaultCenter={DEFAULT_CENTER}
      zoom={zoom}
      options={{ maxZoom: 18, zoomControl: false, mapId: process.env.REACT_APP_GOOGLE_MAPS_ID }}
      yesIWantToUseGoogleMapApiInternals
      onGoogleApiLoaded={onGoogleApiLoaded}
      onChange={onChange}
    >
      {clusters.map((cluster) => {
        const [lng, lat] = cluster.geometry.coordinates;
        const { cluster: isCluster, point_count: pointCount, id, color, showWarning } = cluster.properties;

        const onClusterClick = () => {
          const x = (offset.right - offset.left) / 2;
          const y = (offset.bottom - offset.top) / 2;

          map.setZoom(Math.min(supercluster.getClusterExpansionZoom(cluster.id), 20));
          map.panTo({ lat, lng });
          map.panBy(x, y);
        };

        if (isCluster) {
          return (
            <MapCluster
              key={cluster.id}
              lat={lat}
              lng={lng}
              onClick={onClusterClick}
            >
              {pointCount}
            </MapCluster>
          );
        }

        return (
          <MapMarker
            key={id}
            lat={lat}
            lng={lng}
            color={color}
            showWarning={showWarning}
            className={cx({ [styles.selected]: id === selectedMarker })}
            onClick={() => selectMarker(id)}
          />
        );
      })}
    </GoogleMapReact>
  );
};
