import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export class DefaultAttributes {
  @PrimaryColumn()
  id: string;

  @CreateDateColumn({ default: 'now()', name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ default: 'now()', name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ default: 'now()', name: 'deleted_at', nullable: true })
  deletedAt?: Date;
}
