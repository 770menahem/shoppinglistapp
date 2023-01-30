import React from 'react';
import { Directions } from '../types/aisle.type';

const directionOptions = [
  { value: 'vertical', label: 'מאונך' },
  { value: 'horizontal', label: 'מאוזן' },
  { value: 'end-horizontal', label: 'מאוזן סוף' },
  { value: 'end-vertical', label: 'מאונך סוף' },
  { value: 'start-horizontal', label: 'מאוזן כניסה' },
  { value: 'start-vertical', label: 'מאונך כניסה' },
];

export default function DirectionSelect({
  direction,
  setDirection,
}: {
  direction: Directions;
  setDirection: (direction: Directions) => void;
}) {
  return (
    <select value={direction} onChange={(e) => setDirection(e.target.value as Directions)}>
      {directionOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
