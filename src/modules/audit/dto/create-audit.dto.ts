import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import type { ICoordinates } from "modules/radar/models/interfaces";

export class CreateAuditDto {
  @IsNotEmpty()
  @IsString()
  public request!: string;

  @IsNotEmpty()
  @ValidateNested({ each: false })
  public response!: ICoordinates | null;
}
