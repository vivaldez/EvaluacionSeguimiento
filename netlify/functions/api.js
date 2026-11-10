exports.handler=async(event)=>{
 const headers={'Access-Control-Allow-Origin':'*','Content-Type':'application/json'};
 if(event.httpMethod==='OPTIONS')return{statusCode:200,headers,body:''};
 try{
  const {neon}=require('@neondatabase/serverless');
  const sql=neon(process.env.DATABASE_URL);
  if(event.httpMethod==='GET'){
   const est=await sql`SELECT * FROM estudiantes ORDER BY grado,seccion,nombre`;
   const ev=await sql`SELECT * FROM evaluaciones`;
   return{statusCode:200,headers,body:JSON.stringify({estudiantes:est,evaluaciones:ev})};
  }
  if(event.httpMethod==='POST'){
   const b=JSON.parse(event.body||'{}');
   // El frontend envía el estado completo; persistir evaluaciones presentes
   for(const [k,inds] of Object.entries(b.evals||{})){
     const [periodo,gs,sub,mat]=k.split('|'); const [grado,seccion]=gs.split('-');
     for(const [indicador,nivel] of Object.entries(inds||{})){
       await sql`INSERT INTO evaluaciones(periodo,matricula,grado,seccion,asignatura,indicador,nivel,updated_at) VALUES (${periodo},${mat},${grado},${seccion},${sub},${indicador},${nivel},now()) ON CONFLICT (periodo,matricula,asignatura,indicador) DO UPDATE SET nivel=EXCLUDED.nivel,updated_at=now()`;
     }
   }
   return{statusCode:200,headers,body:JSON.stringify({ok:true})};
  }
  return{statusCode:405,headers,body:'{}'};
 }catch(e){return{statusCode:500,headers,body:JSON.stringify({error:String(e),note:'Configure DATABASE_URL en Netlify y ejecute db/schema.sql + seeds en Neon. La app sigue con autoguardado local.'})}}
};
