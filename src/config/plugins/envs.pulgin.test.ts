import { envs } from "./envs.pulgin"



describe('envs.plugin.ts', () => {
    test('should return env options', () => {
        
        expect( envs ).toEqual(
            {
                PORT: 3000,
                MAILER_SERVICE: 'gmail',
                MAILER_EMAIL: 'juanrestrepowebdev@gmail.com',
                MAILER_SECRET_KEY: 'dzcowrpnmgbiujro',
                PROD: false,
                MONGO_URL: 'mongodb://juan:123456789@localhost:27017',
                MONGO_DB_NAME: 'NOC-TEST',
                MONGO_USER: 'juan',
                MONGO_PASS: '123456789'
              }
        );
    });

    test('should return error if not found env', async() => {

        jest.resetModules();
        process.env.PORT = 'ABC';

        try {
            await import('./envs.pulgin');
            expect(true).toBe(false);

        } catch (error) {
            expect(`${error}`).toBe('EnvVarError: env-var: \"PORT\" should be a valid integer')
        }
    })
})