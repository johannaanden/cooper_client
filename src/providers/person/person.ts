import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { CooperProvider } from '../cooper/cooper';


@Injectable()
export class PersonProvider {
public gender: string;
public age: number;
public assessmentMessage: string;

  constructor(private cooper: CooperProvider) {}

  doAssessment(distance: number): coid {
    this.assessmentMessage = this.cooper.assess(this, distance);
  }

}
