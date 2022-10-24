import { UseCaseInterface } from "domain/usecases/use-case";

import { faker } from "@faker-js/faker";
import { PlayerEntity } from "domain/player/player.entity";

export class LoadPlayerUseCase implements UseCaseInterface {

    public async execute(): Promise<PlayerEntity> {
        const player = new PlayerEntity({
            name: faker.name.fullName(),
            pot: 420000
        });
        return player;
    }

}