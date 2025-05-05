export enum Rol {
  Estudiante = 0,
  InvestigadorContratado,
  DocenteInvestigador,
  Conserje,
  TecnicoLaboratorio,
  Gerente,
  GerenteDocenteInvestigador,
}

export const ALL_ROLES: Rol[] = Object
  .values(Rol)
  .filter((v) => typeof v === "number") as Rol[];

export const ADMIN_ROLE: Rol[] = [
  Rol.Gerente,
  Rol.GerenteDocenteInvestigador,
];

export enum Departamento {
  InformaticaEIngenieriaDeSistemas = 0,
  IngenieriaElectronicaYComunicaciones,
}
