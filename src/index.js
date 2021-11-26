import dotenv from 'dotenv'

import app from './server';
import connectDb from './database';

const main = () => {
    dotenv.config();

    const PORT = app.get('port');
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

    connectDb();
}

main();