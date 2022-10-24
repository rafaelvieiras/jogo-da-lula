import { UseCaseInterface } from "domain/usecases/use-case";
import { EndRoundUseCase } from "../end-round/end-round.use-case";

export class StartRoundUseCase implements UseCaseInterface {

    constructor(private readonly endRoundUseCase: EndRoundUseCase) {}

    async execute(): Promise<any> {  
        this.endRoundUseCase.execute();
    }

}