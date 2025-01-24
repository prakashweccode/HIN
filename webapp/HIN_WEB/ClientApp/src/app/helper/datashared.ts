export class Datashared {
  private dateValue: any;
  private viewValue: any;
  private leadValue: any;
  private oppValue: any;
  private pipelineValue: any;
  private permissionBaseValue: any;
  private entityType: any;
  private eventValueId: any;
  private eventValue: any;


  constructor() { }

  resetSession() {
    sessionStorage.removeItem("oppValue");
    sessionStorage.removeItem("viewValue");
    sessionStorage.removeItem("entityType");
    sessionStorage.removeItem("leadValue");
    sessionStorage.removeItem("pipelineValue");
    sessionStorage.removeItem("permissionBaseValue");
    sessionStorage.removeItem("serviceValue");
  }

  setDateValue(val) {
    this.dateValue = JSON.stringify(val);
  }
  getDateValue() {
    if (this.dateValue) {
      var temData = JSON.parse(this.dateValue);
      this.oppValue = null;
      return temData;
    }
    else {
      return null;
    }
  }
  setEventId(val) {
    this.eventValueId = val;
  }
  getEventId() {
    if (this.eventValueId) {
      var temData = JSON.parse(JSON.stringify(this.eventValueId));
      this.eventValueId = null;
      return temData;
    }
    else {
      return null;
    }
  }

  setEventValue(val) {
    this.eventValue = val;
  }
  getEventValue() {
    if (this.eventValue) {
      var temData = JSON.parse(JSON.stringify(this.eventValue));
      this.eventValue = null;
      return temData;
    }
    else {
      return null;
    }
  }

  setOppValue(val) {
    this.oppValue = val;
  }
  getOppValue() {
    if (this.oppValue) {
      var temData = JSON.parse(JSON.stringify(this.oppValue));
      this.oppValue = null;
      return temData;
    }
    else {
      return null;
    }
  }
  setValue(val) {
    this.viewValue = val;
  }
  getValue() {
    if (this.viewValue) {
      var temData = JSON.parse(JSON.stringify(this.viewValue));
      this.viewValue = null;
      return temData;
    }
    else {
      return null;
    }
  }

  setEntityValue(val) {
    this.entityType = val;
  }
  getEntityValue() {
    if (this.entityType) {
      var temData = JSON.parse(JSON.stringify(this.entityType));
      this.entityType = null;
      return temData;
    }
    else {
      return null;
    }
  }




  setLeadValue(val) {
    this.leadValue = val;
  }
  getLeadValue() {
    if (this.leadValue) {
      var temData = JSON.parse(JSON.stringify(this.leadValue));
      this.leadValue = null;
      return temData;
    }
    else {
      return null;
    }
  }
  setPipelineValue(val) {
    this.pipelineValue = val;
  }
  getPipelineValue() {
    if (this.pipelineValue) {
      var temData = JSON.parse(JSON.stringify(this.pipelineValue));
      this.pipelineValue = null;
      return temData;
    }
    else {
      return null;
    }
  }

  setPermissionBaseValue(val) {
    this.permissionBaseValue = val;
  }

  getPermissionBaseValue() {
    if (this.permissionBaseValue) {
      let tempData = this.permissionBaseValue;
      this.permissionBaseValue = null;
      return tempData;
    }
  }
}
