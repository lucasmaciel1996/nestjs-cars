import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  index() {
    return [
      {
        name: 'UNC Santa Catarina',
        code: 1325514,
      },
      {
        name: 'TRAP Santa Catarina',
        code: 13255143,
      },
      {
        name: 'ANF Santa Catarina',
        code: 1322323,
      },
    ];
  }
}
