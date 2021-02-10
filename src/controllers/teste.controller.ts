import { Controller, Get } from '@tsed/common';
import { Hidden } from '@tsed/swagger';

@Controller('/teste')
export class Test {
  @Get('/success')
  sucess() {
    return {
      message: 'Success',
    };
  }

  @Get()
  @Hidden()
  error() {
    throw Error;
  }
}
