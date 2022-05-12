import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  schema: 'vehicles',
})
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;
}
