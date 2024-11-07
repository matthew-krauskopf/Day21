import { State } from './state.entity';

export function updateStateDetails(
  states: State[],
  selectedState: number | undefined,
  name: string,
  abbreviation: string
) {
  const toEditState = states.find((p) => p.id == selectedState);
  if (!toEditState) return states;

  return [
    ...states.filter((p) => p.id != selectedState),
    {
      ...toEditState,
      name: name,
      abbreviation: abbreviation,
    },
  ];
}

export function markStateDeleted(
  states: State[],
  selectedState: number | undefined
) {
  const toEditState = states.find((p) => p.id == selectedState);
  if (!toEditState) return states;

  return [
    ...states.filter((p) => p.id != selectedState),
    {
      ...toEditState,
      deleted: true,
    },
  ];
}

export function createNewState(states: State[]) {
  return {
    id: states.map((p) => p.id).reduce((max, a) => (max > a ? max : a), 0) + 1,
    name: 'New State',
  };
}
