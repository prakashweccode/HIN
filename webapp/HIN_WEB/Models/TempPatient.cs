using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;

namespace HIN_WEB.Models
{
    public class TempPatient
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Zipcode { get; set; }
        public int? Age { get; set; }
        public bool? Gender { get; set; }
        public DateTime? Dob { get; set; }
        public string HomePhone { get; set; }
        public string CellPhone { get; set; }
        public string MaritalStatus { get; set; }
        public string EmailAddress { get; set; }
        public string EmergencyContact { get; set; }
        public string Telephone { get; set; }
        public string Allergies { get; set; }
        public bool? Nka { get; set; }
        public bool? Hypertension { get; set; }
        public bool? Liverdisease { get; set; }
        public bool? Diabetes { get; set; }
        public bool? InsulinDependent { get; set; }
        public bool? Cancer { get; set; }
        public bool? HeartDisease { get; set; }
        public bool? KidneyDisease { get; set; }
        public bool? ThyroidDisease { get; set; }
        public string Type { get; set; }
        public string OtherMedicalProblems { get; set; }
        public string PastSurgeriesAndHospitalization { get; set; }
        public string Medication { get; set; }
        public bool? BloodTransfusion { get; set; }
        public bool? Sedentary { get; set; }
        public bool? MildExercise { get; set; }
        public bool? RegularVigorius { get; set; }
        public bool? DrinkAlcohol { get; set; }
        public bool? ConvernedDrink { get; set; }
        public bool? UseTobocco { get; set; }
        public bool? StreetDrugs { get; set; }
        public bool? StreetDrugNeedle { get; set; }
        public bool? SexuallyActive { get; set; }
        public bool? Contraception { get; set; }
        public bool? LiveAlone { get; set; }
        public bool? FrequentlyFalls { get; set; }
        public bool? Colonoscopy { get; set; }
        public string ColonoscopyData { get; set; }
        [StringLength(250)]
        public string FatherHealthProblem { get; set; }
        public int? FatherAge { get; set; }
        public string MotherHealthPproblem { get; set; }
        public int? MotherAge { get; set; }
        public string SiblingHealthProblem { get; set; }
        public int? SiblingAge { get; set; }
        public string PatientPrintedName { get; set; }
        public DateTime? Date { get; set; }
        public string PatientSignature { get; set; }
        public string NombreDelPaciente { get; set; }
        public DateTime? Fecha { get; set; }
        public string FirmaDelPaciente { get; set; }
        public string PatientAttenSign { get; set; }
        public string AttenDate { get; set; }
        public string FirmaDelAtencion { get; set; }
        public string AtencionDate { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }
        public bool? IsPatientApproved { get; set; }
        public string G { get; set; }
        public string P { get; set; }
        public string A { get; set; }
        public string Lmp { get; set; }
        public string Mamogram { get; set; }
        public string PapSmear { get; set; }
        public string LastName { get; set; }
        public string PacksPerDay { get; set; }
        public string Years { get; set; }
        public string YearsToQuit { get; set; }
        public string ContraceptionData { get; set; }
        public string BloodTransfusionData { get; set; }
        
        public string DrinkAlcoholData { get; set; }
        public bool? Asthma { get; set; }
        public bool? MentalDisorder { get; set; }
        public bool? AttentionAgree { get; set; }
        public bool? AtencionAgree { get; set; }
        public bool? IsConsentEn { get; set; }
        public bool? IsConsentimiento { get; set; }
        public string PracticeCode { get; set; }
    }
}
