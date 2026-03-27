import React from 'react';

import { ReactComponent as UsersIcon } from '../../assets/icons/users.svg';
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg';
import { ReactComponent as UserGearIcon } from '../../assets/icons/user-gear.svg';
import { ReactComponent as BuildingsIcon } from '../../assets/icons/buildings.svg';

import { useAuth } from '../../hooks/useAuth';
import { Tooltip } from '../Tooltip';
import { PopoverMenu } from '../PopoverMenu';

import styles from './UserWidget.module.scss';

export const UserWidget = () => {
  const [isPopoverVisible, setIsPopoverVisible] = React.useState(false);

  const { isAdmin, isManager, isOwner, user, onLogout } = useAuth();

  const togglePopover = React.useCallback(() => {
    setIsPopoverVisible((visibility) => !visibility);
  }, []);

  const hidePopover = React.useCallback(() => {
    setIsPopoverVisible(false);
  }, []);

  const menu = [
    ...(isAdmin ? [{
      label: 'Companies',
      Icon: BuildingsIcon,
      to: '/companies',
    }] : []),
    ...(isOwner ? [{
      label: 'Managers',
      Icon: UserGearIcon,
      to: '/managers',
    }] : []),
    ...(isManager || isOwner ? [{
      label: 'Employees',
      Icon: UsersIcon,
      to: '/employees',
    }] : []),
    {
      label: 'Log out',
      handler: onLogout,
      Icon: ExitIcon,
      theme: 'danger',
    },
  ];

  return (
    <PopoverMenu
      visible={isPopoverVisible}
      items={menu}
      onVisibleChange={hidePopover}
    >
      <Tooltip
        visible={isPopoverVisible ? false : undefined}
        content={<>{user.name} {user.surname}<br />{user.email}</>}
        placement="bottom-center"
      >
        <button type="button" className={styles.user} onClick={togglePopover}>
          {user.name[0]}{user.surname[0]}
        </button>
      </Tooltip>
    </PopoverMenu>
  );
};
