import { Column, Entity } from 'typeorm';
import { DefaultAttributes } from '../../../database/default.attributes';

@Entity({
  schema: 'vehicles',
})
export class Cars extends DefaultAttributes {
  @Column()
  name: string;

  @Column()
  plate: string;
}
