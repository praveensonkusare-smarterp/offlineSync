import { call, put, takeLatest } from 'redux-saga/effects';
import RealmServices from '../../services/RealmServices';
import {
  fetchProductsRequest,
  fetchProductsSuccess,
  fetchProductsFailure,
} from '../reducers/productReducer';

function* fetchProducts() {
  try {
    yield call([RealmServices, RealmServices.addInitialProducts]);
    const products = yield call([RealmServices, RealmServices.getProducts]);
    yield put(fetchProductsSuccess(Array.from(products))); // Convert Realm Results to plain array
  } catch (error) {
    yield put(fetchProductsFailure(error.message));
  }
}

export function* watchProductSaga() {
  yield takeLatest(fetchProductsRequest.type, fetchProducts);
}
