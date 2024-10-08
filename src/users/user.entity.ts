import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", {length: 255})
    firstName: string;

    @Column("varchar", {length: 255})
    lastName: string;

    @Column({default: true})
    isActive: boolean;
}