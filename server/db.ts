import { neon } from '@neondatabase/serverless'
 import dotenv from 'dotenv'
 dotenv.config()
 
 const sql = neon(process.env.DATABASE_URL!)
 
 export async function initDB() {
   await sql`
     CREATE TABLE IF NOT EXISTS scans (
       id SERIAL PRIMARY KEY,
       disease VARCHAR(255) NOT NULL,
       confidence INTEGER NOT NULL,
       severity VARCHAR(50) NOT NULL,
       affected_area VARCHAR(255),
       pesticide VARCHAR(255),
       dosage VARCHAR(255),
       schedule VARCHAR(255),
       description TEXT,
       created_at TIMESTAMP DEFAULT NOW()
     )
   `
   console.log('✅ Database initialized')
 }
 
 export async function saveScan(result: {
   disease: string
   confidence: number
   severity: string
   affectedArea: string
   treatment: {
     pesticide: string
     dosage: string
     schedule: string
   }
   description: string
 }) {
   const saved = await sql`
     INSERT INTO scans (
       disease,
       confidence,
       severity,
       affected_area,
       pesticide,
       dosage,
       schedule,
       description
     ) VALUES (
       ${result.disease},
       ${result.confidence},
       ${result.severity},
       ${result.affectedArea},
       ${result.treatment.pesticide},
       ${result.treatment.dosage},
       ${result.treatment.schedule},
       ${result.description}
     )
     RETURNING *
   `
   return saved[0]
 }
 
 export async function getScans() {
   const scans = await sql`
     SELECT * FROM scans
     ORDER BY created_at DESC
     LIMIT 10
   `
   return scans
 }
 
 export default sql