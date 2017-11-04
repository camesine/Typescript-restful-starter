import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('sample')
export class Sample {

    @PrimaryGeneratedColumn()
    public id: number

    @Column('text')
    public text: string

}
