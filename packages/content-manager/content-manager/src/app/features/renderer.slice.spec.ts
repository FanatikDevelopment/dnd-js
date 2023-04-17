import {
  fetchRenderer,
  rendererAdapter,
  rendererReducer,
} from './renderer.slice';

describe('renderer reducer', () => {
  it('should handle initial state', () => {
    const expected = rendererAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(rendererReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchRenderers', () => {
    let state = rendererReducer(undefined, fetchRenderer.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = rendererReducer(
      state,
      fetchRenderer.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = rendererReducer(
      state,
      fetchRenderer.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
