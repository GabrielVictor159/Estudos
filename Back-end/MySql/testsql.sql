alter table cidadaos 
add column cursopreferido int;
alter table cidadaos
add foreign key (cursopreferido)
references cursos(idcurso);
describe cidadaos;

select * from cidadaos;
select * from cursos;

update cidadaos set cursopreferido = '4' where id = '1';
