import React from 'react';

import styles from './Table.module.scss';

export const Table = ({ columns, data }) => {
  const getValue = (row, key, render, index) => {
    if (render) {
      return render(typeof key === 'string' ? row[key] : key.map((k) => row[k]), index);
    }

    return typeof key === 'string' ? row[key] : key.reduce(((acc, k) => `${acc} ${row[k]}`), '');
  };

  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <td />
            {columns.map(({ title }) => (
              <th key={title}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              {columns.map(({ key, render }, j) => (
                <td key={j}>{getValue(row, key, render, i)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
