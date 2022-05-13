import { Column, Entity } from 'typeorm';
import { DefaultAttributes } from '../../../database/default.attributes';

@Entity({
  schema: 'companies',
})
export class Companies extends DefaultAttributes {
  @Column()
  name: string;

  @Column({ name: 'id_legacy' })
  idLegacy: string;

  @Column({ name: 'is_active' })
  isActive: boolean;
}
