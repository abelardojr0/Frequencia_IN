export interface Usuario {
  id?: string | number;
  email: string;
  nome?: string;
  cpf?: string;
  password: string;
  user_type: string;
  email_confirmed?: boolean;
  profile_picture?: any;
}

export interface Presenca {
  id?: string;
  diaSemana: string;
  data: string;
  turma: string;
  horarioInicio: string;
  horarioFim: string;
  obs?: string;
}
