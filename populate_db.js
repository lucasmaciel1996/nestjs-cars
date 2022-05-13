const { createConnection } = require('typeorm');

const conn = createConnection({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'root',
  password: 'password',
  database: 'sis_cars',
  entities: [],
  migrations: [],
  cli: {
    migrationsDir: 'src/database/migrations',
  },
  synchronize: false,
});

conn.then((c) => {
  if (c.isConnected) {
    setInterval(async () => {
      console.log('New Register' + Date.now());

      const [company] = await c.query(
        'select count(1) from companies.companies where is_active is true limit 2',
      );
      console.log('Company count:', Number(company.count));

      if (!company?.count || Number(company.count) < 2) {
        throw new Error('Companies does not exits!!');
      }

      await c.query(`insert into vehicles.cars("name",plate,brand_id) 
      select CONCAT('Car-',floor(random() * 100 + 1)) as name, UPPER(plate) as plate, (array[1,2,3,4,5,6,7])[floor(random() * 7 + 1)] as brand_id  from (select generate_series(1,1000) as car,substr(md5(random()::text), 0, 6) as plate ) as t 
      `);

      await c.query(`
      insert into companies.companies_cars (car_id,company_id)
        select 
        c.id as car_id,
        (array (select id from companies.companies where is_active is true))[floor(random() * ( select count(1) from companies.companies where is_active is true ) +1)] as company_id 
        from vehicles.cars c  
        left join companies.companies_cars cc on cc.car_id = c.id
        where cc.car_id is null ;
      `);
    }, 2000);
  }
});
