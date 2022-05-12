const { createConnection } = require('typeorm');

const conn = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'wtp',
  entities: [],
  migrations: [],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
});

conn.then((c) => {
  if (c.isConnected) {
    setInterval(() => {
      console.log('New Register' + Date.now());

      c.query(`insert into vehicles.cars("name",plate,brand_id) 
      select CONCAT('Car-',floor(random() * 100 + 1)) as name, UPPER(plate) as plate, (array[1,2,3,4,5,6,7])[floor(random() * 7 + 1)] as brand_id  from (select generate_series(1,1000) as car,substr(md5(random()::text), 0, 6) as plate ) as t 
      `);
    }, 2000);
  }
});
