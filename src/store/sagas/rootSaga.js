import { all } from 'redux-saga/effects';
import { watchProductSaga } from './productSaga';

export default function* rootSaga() {
  yield all([
    // Add other sagas here
        watchProductSaga(),

  ]);
}
