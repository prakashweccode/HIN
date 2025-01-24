export interface IGauge {
  MinimumGoal: number;
  GoodGoal: number;
  GreatGoal: number;
  ActualGoal: number;
}
export class Gauge implements IGauge {
  MinimumGoal: number;
  GoodGoal: number;
  GreatGoal: number;
  ActualGoal: number;
}

export class PMGA extends Gauge {

}
export class PMWO extends Gauge {

}
export class PWNO extends Gauge {

}
export class PYGA extends Gauge {

}
export class PYWO extends Gauge {

}
