import { useForm ,useFieldArray} from "react-hook-form"
import { DevTool } from '@hookform/devtools'
import { useEffect } from "react"
function HookForm() {
    type FormData = {
        username: string
        password: string
        channel: string
        social:{
            twitter:'',
            facebook:'',
            instagram:''
        }
        phoneNumbers :string[]
        phNumbers:{
            number:string
        }[]
        age:number
        date:Date
    }
    const {register ,control,handleSubmit,formState : {errors ,touchedFields,dirtyFields,isDirty,isValid,isSubmitted,isSubmitting,isSubmitSuccessful,submitCount},watch,getValues,setValue,reset,trigger} = useForm<FormData>({
        mode:'all',
        defaultValues: {
            username: 'bill',
            password: '',
            channel: '',
            social:{
                twitter:'',
                facebook:'',
                instagram:''
            },
            phoneNumbers :["",""],
            phNumbers:[{number:''}],
            age:0,
            date:new Date()
        }}
    )

    const {fields,append,remove}=useFieldArray({
        control,
        name:'phNumbers'
    })

    const onSubmit = (data:FormData) => {
        console.log('data submitted',data);
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset();
        }
    },[reset,isSubmitSuccessful])

    const watchUsername = watch('username'); // this will watch for username input field
    const watchformArray = watch(['username','password',]); // this will watch array of input filed
    const watchform = watch(); // this will watch all input field this return object so convert to json string
    console.log(watchUsername);
    console.log(watchform);
    
    console.log(touchedFields,dirtyFields,isDirty); // this will return object of touched fields, dirty fields, isDirty
    console.log(isSubmitted,isSubmitting,isSubmitSuccessful,submitCount); // this will return boolean value of isSubmitted, isSubmitting, isSubmitSuccessful, submitCount

    const handlegetvalue = () => {
    console.log(getValues('username'));
    console.log(getValues(['username','password'])); // this will get value after the button opposite of watch
    console.log(getValues());
    }

    const handlesetvalue =()=>{
        setValue('username','');
    }
  return (
    <div>
        <form onSubmit={handleSubmit(onSubmit) }>
            <h1>React Hook Form{JSON.stringify(watchform)}</h1>
            <h1>{watchformArray}</h1>
            <label htmlFor='username'>Username</label>
            <input type='text' id='username' {...register('username' 
                ,{
                    required: 'This is required',
                    maxLength: {value: 10, message: 'Max length is 10'}
                }
            )} />
            {errors.username && <p className='error'>{errors.username.message}</p>}
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' {...register('password',
                {
                    required: 'This is required',
                    minLength: {value: 5, message: 'Min length is 5'}
                }
            )} />
            {errors.password && <p className='error'>{errors.password.message}</p>}
            <label htmlFor='channel'>channel</label>
            <input type='text' id='channel' {...register('channel',{
                required: 'This is required',
            })} />
            {errors.channel && <p className='error'>{errors.channel.message}</p>}

            <label htmlFor='twitter'>Twitter</label>
            <input type='text' id='twitter' {...register('social.twitter')} />

            <label htmlFor='twitter'>Instagram</label>
            <input type='text' id='twitter' {...register('social.instagram')} />

            <label htmlFor='Primary-Phone-Number'>Primary Number</label>
            <input type='text' id='Primary-Phone-Number' {...register('phoneNumbers.0')} />

            <label htmlFor='Secondary-Phone-Number'>Secondary Number</label>
            <input type='text' id='Secondary-Phone-Number' {...register('phoneNumbers.1',{
                disabled: watch('phoneNumbers.0') === '', // this will conditionally disable the input field
            })} />
            
            <label htmlFor='phNumbers'>Phone Numbers</label>
            {fields.map((field,index)=>(
                <div key={field.id}>
                    <input {...register(`phNumbers.${index}.number` as const)} />
                    {index >0 &&<button type='button' onClick={()=>remove(index)}>Delete</button>}
                </div>
            ))}
            <button type='button' onClick={()=>append({number:''})}>Add Number</button>

            <label htmlFor='Age'>Age</label>
            <input type='number' id='Age' {...register('age',{
                valueAsNumber:true,
            })} />

            <label htmlFor='date'>date</label>
            <input type='date' id='date' {...register('date',{
                valueAsDate: true,
            })} />

            <button type='submit' disabled={!isDirty || !isValid || !isSubmitting}>Submit</button>
            <button type='button' onClick={handlegetvalue}>getvalue</button>
            <button type='button' onClick={handlesetvalue}>setvalue</button>
            <button type='button' >reset</button>
            <button type='button' onClick={()=>trigger()} >trigger</button>
            <button type='button' onClick={()=>trigger('password')} >trigger password</button> {/*this will trigger only password field*/}
        </form>
        <DevTool control={control}/>
    </div>
  )
}

export default HookForm
