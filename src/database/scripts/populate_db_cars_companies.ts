import { ConnectionOptions, createConnection } from 'typeorm';
import ormConfig from '../../../ormconfig';

const connection = createConnection(ormConfig as ConnectionOptions);
const SECOND = 2;
const DELAY_INSERT = SECOND * 1000;
const QDT_LINES = 10;

connection.then((c) => {
  if (c.isConnected) {
    setInterval(async () => {
      console.log('New Register' + Date.now());

      const [company] = await c.query(
        'select count(1) from business_unit.companies where is_active is true limit 2',
      );
      console.log('Company count:', Number(company.count));

      if (!company?.count || Number(company.count) < 2) {
        throw new Error('Companies does not exits!!');
      }

      await c.query(
        `
        insert into vehicle.cars("name",plate,brand_id)
        select
         CONCAT('Car-',floor(random() * 100 + 1)) as name, 
         UPPER(plate) as plate,
         (array[1,2,3,4,5,6,7])[floor(random() * 7 + 1)] as brand_id
        from (select generate_series(1,$1) as car,substr(md5(random()::text), 0, 6) as plate ) as t
      `,
        [QDT_LINES],
      );

      await c.query(`
        insert into product.companies_cars (car_id,company_id,daily_rate)
        select
          c.id as car_id,
          (array (select id from business_unit.companies where is_active is true))[floor(random() * ( select count(1) from business_unit.companies where is_active is true ) +1)] as company_id,
          floor(random() *200 + 50) as daily_rate
        from vehicle.cars c
        left join product.companies_cars cc on cc.car_id = c.id
        where cc.car_id is null ;
      `);
    }, DELAY_INSERT);
  }
});
