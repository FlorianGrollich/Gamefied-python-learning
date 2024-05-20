import { PlayerAction } from '../../pages/MainPage/utils/enums'
import playerReducer, {
  doActions,
  selectPlayerPosition,
} from '../../pages/MainPage/slices/playerSlice'

describe('playerSlice', () => {
  const initialState = {
    position: [180, 0, 180] as [number, number, number],
  }

  it('should handle initial state', () => {
    expect(playerReducer(undefined, { type: 'unknown' })).toEqual({
      position: [180, 0, 180],
    })
  })

  it('should handle doActions with MOVE action', () => {
    const actual = playerReducer(initialState, doActions([PlayerAction.MOVE]))
    expect(actual.position[0]).toEqual(160) // 180 - 20
    expect(actual.position[1]).toEqual(0)
    expect(actual.position[2]).toEqual(180)
  })

  it('should not change position for unknown actions', () => {
    const actual = playerReducer(initialState, doActions(['UNKNOWN_ACTION']))
    expect(actual.position).toEqual([180, 0, 180])
  })
})

describe('Selectors', () => {
  const state = {
    player: {
      position: [180, 0, 180] as [number, number, number],
    },
  }

  it('selectPlayerPosition should return the player position', () => {
    const position = selectPlayerPosition(state)
    expect(position).toEqual([180, 0, 180])
  })
})
