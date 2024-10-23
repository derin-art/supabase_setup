import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { Database, Json, Tables, } from 'database.types';


type Records = Tables<"Records">


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
 async getTable():Promise<any>{
  try{
    const supabase = createClient(process.env.SUPABASE_URL || "no", process.env.SUPABASE_PUBLIC_KEY || "jj")
    const {data, error} = await supabase.from("Records").select()
    if(error) console.log(error)
    return data
  }catch(err){
    return err
  }}

  async addRecordRow(insertObj: {word:string}): Promise<any>{
    
    try{
      const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_PUBLIC_KEY)
      const {data, error, status, statusText} = await supabase.from("Records").insert<Records>(insertObj).select()
      const Found: Records[]  = data
      return {Found, insertObj}
    }
    catch(err){
      return err
      console.log(err)
    }
  }
}

