import { Injectable, Scope } from '@nestjs/common';

import { caching } from 'cache-manager';

@Injectable()
export class CacheService {
  private cache = null;
  constructor() {
    console.log('passaou aqui .....');
    caching('memory', {
      max: 10000,
      ttl: 42000 * 1000 /*milliseconds*/,
    }).then((cache) => {
      this.cache = cache;
    });
  }

  async set(key: string, value: string): Promise<any> {
    await this.cache.set(key, value);
  }

  async get(key: string): Promise<any> {
    console.log('get secret');
    const value = await this.cache.get(key);
    return value;
  }
}
