import fetch from 'unfetch';
import {
  VEGA_WALLET_HOST_CACHE_KEY,
  VEGA_WALLET_TOKEN_CACHE_KEY,
} from 'config';
import cache from 'utils/cache';

export async function wallet({
  method,
  endpoint,
  data,
  auth,
}: {
  method: string;
  endpoint: string;
  data?: any;
  auth?: boolean;
}): Promise<any> {
  const host = cache(VEGA_WALLET_HOST_CACHE_KEY);
  const token = cache(VEGA_WALLET_TOKEN_CACHE_KEY);

  const res = await fetch(host + endpoint, {
    method,
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
      ...(auth ? { Authorization: `Bearer ${token}` } : {}),
    },
  });
  return await res.json();
}

export async function graphql(
  query: string,
  variables: any = {}
): Promise<any> {
  const res = await fetch('https://lb.testnet.vega.xyz/query', {
    method: 'POST',
    body: JSON.stringify({
      operationName: null,
      query,
      variables,
    }),
    headers: {
      'content-type': 'application/json',
    },
  });
  const { data } = await res.json();
  return data;
}

export async function node(endpoint: string, data?: any): Promise<any> {
  const res = await fetch('https://lb.testnet.vega.xyz' + endpoint, {
    method: data ? 'POST' : 'GET',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
  });
  return await res.json();
}
