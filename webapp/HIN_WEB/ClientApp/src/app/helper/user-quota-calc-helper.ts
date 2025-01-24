export class UserQuotaCalcHelper {
  //User Goal Calculation Starts
  CalculateNoOfDeals(asp, goalValue): number {
    if (asp && goalValue && asp > 0) {
      let result = (parseFloat(goalValue) / parseFloat(asp));
      return parseInt(result.toFixed());
    }
    else {
      return 0;
    }
  }

  CalculateGoalAmountPerMonth(asp, goalValue) {
    if (asp && goalValue && asp > 0) {
      let result = (parseFloat(goalValue) / parseFloat(asp));
      return Math.ceil((result / 12 * parseFloat(asp)));
    }
    else {
      return 0;
    }
  }
  CalculateNoOfDealsPerMonth(asp, goalValue): number {
    if (asp && goalValue && asp > 0) {
      let result = (parseFloat(goalValue) / parseFloat(asp));
      return Math.ceil((parseInt(result.toFixed()) / 12));
    }
    else {
      return 0;
    }
  }
  CalculateClosingPercentage(asp, goalValue, newLeads) {
    if (asp && goalValue && newLeads) {
      let dealsPerMonth = this.CalculateNoOfDealsPerMonth(asp, goalValue);
      return Math.ceil(((parseFloat(dealsPerMonth.toString()) / (newLeads / 100)) / 4));
    }
    else {
      return 0;
    }
  }
  //User Goal Calcualtion Ends
}
