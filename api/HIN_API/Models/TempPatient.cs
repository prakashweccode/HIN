using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HIN_API.Models
{
    public partial class TempPatient
    {
        [Key]
        public int Id { get; set; }
        [StringLength(100)]
        public string PatientName { get; set; }
        public string Address { get; set; }
        [StringLength(100)]
        public string City { get; set; }
        [StringLength(50)]
        public string State { get; set; }
        [StringLength(50)]
        public string Zipcode { get; set; }
        public int? Age { get; set; }
        public bool? Gender { get; set; }
        [Column("DOB", TypeName = "date")]
        public DateTime? Dob { get; set; }
        [StringLength(25)]
        public string HomePhone { get; set; }
        [StringLength(25)]
        public string CellPhone { get; set; }
        [StringLength(25)]
        public string MaritalStatus { get; set; }
        [StringLength(100)]
        public string EmailAddress { get; set; }
        [StringLength(100)]
        public string EmergencyContact { get; set; }
        [StringLength(25)]
        public string Telephone { get; set; }
        public string Allergies { get; set; }
        [Column("NKA")]
        public bool? Nka { get; set; }
        public bool? Hypertension { get; set; }
        public bool? Liverdisease { get; set; }
        public bool? Diabetes { get; set; }
        public bool? InsulinDependent { get; set; }
        public bool? Cancer { get; set; }
        public bool? HeartDisease { get; set; }
        public bool? KidneyDisease { get; set; }
        public bool? ThyroidDisease { get; set; }
        [StringLength(250)]
        public string Type { get; set; }
        public string OtherMedicalProblems { get; set; }
        public string PastSurgeriesAndHospitalization { get; set; }
        [StringLength(300)]
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
        [Column("MotherHealthPProblem")]
        [StringLength(250)]
        public string MotherHealthPproblem { get; set; }
        public int? MotherAge { get; set; }
        [Column("siblingHealthProblem")]
        [StringLength(250)]
        public string SiblingHealthProblem { get; set; }
        [Column("siblingAge")]
        public int? SiblingAge { get; set; }
        [StringLength(250)]
        public string PatientPrintedName { get; set; }
        [Column(TypeName = "date")]
        public DateTime? Date { get; set; }
        public string PatientSignature { get; set; }
        [StringLength(100)]
        public string NombreDelPaciente { get; set; }
        [Column(TypeName = "date")]
        public DateTime? Fecha { get; set; }
        public string FirmaDelPaciente { get; set; }
        public string PatientAttenSign { get; set; }
        [StringLength(25)]
        public string AttenDate { get; set; }
        public string FirmaDelAtencion { get; set; }
        [StringLength(100)]
        public string AtencionDate { get; set; }
        [Column(TypeName = "date")]
        public DateTime? CreatedOn { get; set; }
        [Column(TypeName = "date")]
        public DateTime? UpdatedOn { get; set; }
        [StringLength(250)]
        public string CreatedBy { get; set; }
        [StringLength(250)]
        public string UpdatedBy { get; set; }
        public int? CreatedById { get; set; }
        public int? UpdatedById { get; set; }
        public bool? IsPatientApproved { get; set; }
        [StringLength(150)]
        public string G { get; set; }
        [StringLength(150)]
        public string P { get; set; }
        [StringLength(150)]
        public string A { get; set; }
        [Column("LMP")]
        [StringLength(150)]
        public string Lmp { get; set; }
        [StringLength(150)]
        public string Mamogram { get; set; }
        [StringLength(150)]
        public string PapSmear { get; set; }
        [StringLength(150)]
        public string LastName { get; set; }
        [StringLength(150)]
        public string PacksPerDay { get; set; }
        [StringLength(150)]
        public string Years { get; set; }
        [StringLength(150)]
        public string YearsToQuit { get; set; }
        [StringLength(150)]
        public string ContraceptionData { get; set; }
        [StringLength(250)]
        public string BloodTransfusionData { get; set; }
        [StringLength(250)]
        public string DrinkAlcoholData { get; set; }
        public bool? Asthma { get; set; }
        public bool? MentalDisorder { get; set; }
        public bool? AttentionAgree { get; set; }
        public bool? AtencionAgree { get; set; }
        public bool? IsConsentEn { get; set; }
        [Column("IsCONSENTIMIENTO")]
        public bool? IsConsentimiento { get; set; }
        [NotMapped]
        public string PracticeCode { get; set; }
    }
}
