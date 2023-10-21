import { Param, ParseIntPipe } from '@nestjs/common';

export const ParamInt = (property: string): ParameterDecorator => {
  return Param(property, ParseIntPipe);
};
