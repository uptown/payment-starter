import { ApiProperty } from '@nestjs/swagger';

export class OkResponse {
  @ApiProperty()
  status = 'ok';

  private static response = new OkResponse();
  static of() {
    return this.response;
  }
}
