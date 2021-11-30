import dotenv from 'dotenv'

import app from './server';
import dbConnect from './database';

const main = () => {

    dotenv.config();

    const PORT = app.get('port');

    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    });

    dbConnect();

}

main();