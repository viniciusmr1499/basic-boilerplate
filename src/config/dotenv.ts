import dotenv from 'dotenv';
import { readFileSync } from 'fs';

import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

export default async () => {
  if (process.env.NODE_ENV !== 'production') {
    dotenv.config({
      path: `${__dirname}/../../.env`,
    });
  } else {
    const read = readFileSync(`${__dirname}/../../.env.example`, 'utf-8');
    const vars = dotenv.parse(read);
    const keys = Object.keys(vars);

    await Promise.all(
      keys.map(async (item) => {
        try {
          const url = `https://${process.env.KEY_VAULT_NAME}.vault.azure.net`;
          const credential = new DefaultAzureCredential();
          const client = new SecretClient(url, credential);
          const { value } = await client.getSecret(item.replace(/_/g, '-'));
          process.env[item] = String(value);
        } catch (error) {
          process.env[item] = '';
        }
      }),
    );
  }
};
