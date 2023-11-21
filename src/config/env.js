import { API_PROD, API_DEV } from '@env';
console.log(__DEV__ ? API_PROD : API_DEV)
export default __DEV__ ? API_PROD : API_DEV;