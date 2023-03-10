import { useEffect, useState } from 'react'
import JobService from './apiServices/JobService'
import Button from './components/Button/Button'
import { Card, CardBody, CardFooter, CardImage, CardStack, CardText } from './components/Card/Card'
import Header from './components/Header/Header'
import { JobAttributes } from './statesTypes/JobState'
import Modal, { ModalProps, Radio, TextInput } from './components/Modal/Modal'
import Stack from './components/Stack/Stack'
import { useToggle } from './hooks/useToggle'


export interface JobState {
    [data: string]: string
}

// Main Component
const App = () => {

    const [listJobs, setListJobs] = useState<JobAttributes[]>([])

    const { status: showModal, toggleStatus: toggleModal } = useToggle() // For Modal
    let { status: next, toggleStatus: toggleNext } = useToggle() // For Switching Forms


    let [validate, setValidate] = useState<string[]>([])


    let [job, setJob] = useState<JobState>({
        jobTitle: "",
        companyName: "",
        industry: ""
    }) // Initial State


    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setJob({
          ...job,
          [e.target.name]: e.target.value
        })
  
        setValidate([])
    }

    

    const handleSubmit = async (buttonName: string) => {

        if(buttonName === "next") {
          //validate Fields
          if(job.jobTitle === "" || job.companyName === "" || job.industry === "") {
            if(job.jobTitle === "") setValidate((prev) => [...prev, "jobTitle"])
            if(job.companyName === "") setValidate((prev) => [...prev, "companyName"])
            if(job.industry === "") setValidate((prev) => [...prev, "industry"])
          } else {
            toggleNext()
          }
    
        } else if(buttonName === "save") {
    
          let payload: JobAttributes = {
            jobTitle: job.jobTitle,
            companyName: job.companyName,
            industry: job.industry,
            location: job.location,
            applyType: parseInt(job.applyType),
            minExperience: parseInt(job.minExperience),
            maxExperience: parseInt(job.maxExperience),
            minSalary: parseInt(job.minSalary),
            maxSalary: parseInt(job.maxSalary),
            remoteType: job.remoteType,
            minEmployees: parseInt(job.totalEmployees?.split("-")[0]),
            maxEmployees: parseInt(job.totalEmployees?.split("-")[1])
          } 
    
          const { status } = await JobService.createJob(payload)
          
          if(status === 201) { // Success

            toggleModal()
            setJob({
                jobTitle: "",
                companyName: "",
                industry: ""
            })
            toggleNext()
            fetchJobs()

                
          } else { // Fail
            setJob({
                jobTitle: "",
                companyName: "",
                industry: ""
            })
            alert("Something Went Wrong")
          }
         
    
        }
        
      } // Submit function


    const fetchJobs = async () => {
        const { data } = await JobService.listJobs()
        setListJobs(data)
    } // Fetch Jobs

    useEffect(() => {
        fetchJobs()
    },[])

    return (
        <div>
        <Header 
            image="https://t4.ftcdn.net/jpg/01/00/76/57/360_F_100765796_hVO2AGkofuyqsiiPGd4rdEkjq1FaC11k.jpg"
            className="bg-gray-800 p-5 text-gray-300 text-3xl flex justify-start items-center gap-5">
                Great Vibes Job Portal
        </Header>

        <div className="p-5 flex justify-center md:justify-end sm:justify-end items-center">
            <Button onClick={toggleModal} className="bg-[#1597E4] hover:bg-[#00a2ff] text-[#FFFFFF] px-[16px] py-[8px] h-[40px]">
                Create Job
            </Button>
            
            <JobFormModal showModal={showModal} toggleModal={toggleModal} handleOnChange={handleOnChange} handleSubmit={handleSubmit} validate={validate} next={next}/> 

        </div>

        <div className="flex flex-wrap px-20 pb-20 gap-[12px]">


            {
                listJobs.length === 0 ? 

                <div className='text-2xl'>
                    There is no Jobs Yet!!
                </div>  :

                listJobs.map((job, index) => (
                    // Reusable Card Component
                    <Card key={index} className='border border-solid border-[#E6E6E6] rounded-[10px] w-[830px] h-[320px] bg-[#FFFFFF] font-poppins px-[24px] py-[16px] flex gap-[8px]'>

                        <CardImage src='https://bit.ly/3yekDiC' height={"48px"} width={"48px"} className="rounded-[5px]" />

                        <Stack>
                        <CardBody className='text-[#212121]'>

                            <div>

                                <CardText className="text-[24px]">
                                    {job.jobTitle}
                                </CardText>

                                <CardText className="text-[16px]">
                                    {job.companyName} - {job.industry}
                                </CardText>

                                <CardText className='text-[16px] text-[#646464]'>
                                    {job.location} ({job.remoteType})
                                </CardText>

                            </div>
                            <div className='text-[16px] py-[24px] flex flex-col gap-[8px]'>

                                <CardText>
                                    Part-time (9.00 am - 5.00 pm IST)
                                </CardText>

                                <CardText>
                                    Experience ({job.minExperience} - {job.maxExperience} years)
                                </CardText>

                                <CardText>
                                    INR (₹) {job.minSalary} - {job.maxSalary} / Month
                                </CardText>

                                <CardText>
                                    {job.minEmployees}-{job.maxEmployees} Employees
                                </CardText>
                            </div>

                        </CardBody>

                        <CardFooter className="mt-auto flex gap-[24px]">

                            {
                                job.applyType === 1 ?

                                <Button className='bg-[#1597E4] hover:bg-[#00a2ff] text-[#FFFFFF] px-[16px] py-[8px] h-[40px]'>
                                    Apply Now
                                </Button> : job.applyType === 2 ?

                                <Button className='bg-transparent border border-[#1597E4] hover:bg-[#1597E4] hover:text-[#FFFFFF] text-[#1597E4] px-[16px] py-[8px] h-[40px]'>
                                    External Apply
                                </Button> : ""

                            }

                        </CardFooter>

                        </Stack>
                    </Card>
                ))

            }


        </div>
        </div>
    )
}


interface JobModalProps extends ModalProps {
    validate?: string[]
    next?: boolean
}


{/* Modal for Two Forms */}

const JobFormModal: React.FC<JobModalProps> = (props) => {
    const { showModal, toggleModal, handleOnChange, validate, next } = props

    return (
        <Modal showModal={showModal} toggleModal={toggleModal} height={"564px"} width={"577px"}>

          {/* Switching Forms between Step 1 and Step 2 */}
            {
                !next ?

                <div>
                    <FormOne handleOnChange={handleOnChange} validate={validate}/> 

                    <div className='mt-[96px] flex justify-end'>

                        <Button onClick={() => props.handleSubmit?.("next")} className="bg-[#1597E4] hover:bg-[#00a2ff] text-[#FFFFFF] px-[16px] py-[8px] h-[40px]">
                            Next
                        </Button>  

                    </div>
                </div>

                :

                <div>

                    <FormTwo handleOnChange={handleOnChange} />

                    <div className='mt-[96px] flex justify-end'>

                        <Button onClick={() => props.handleSubmit?.("save")} className="bg-[#1597E4] hover:bg-[#00a2ff] text-[#FFFFFF] px-[16px] py-[8px] h-[40px]">
                            Save
                        </Button>

                    </div>

                </div>


            }

        </Modal>

    )
}


export interface FormProps {
    handleOnChange?: React.ChangeEventHandler<HTMLInputElement>,
    validate?: string[]
}

{/* Step 1 Form */}

const FormOne: React.FC<FormProps> = (props) => {

    const { handleOnChange, validate } = props;
  
    return (
      <Stack className='flex flex-col gap-[24px] justify-end'>
  
          <div className='flex justify-start items-center'>
              <div className='text-[20px] flex-[50%]'>
                Create a job
              </div>
              <div className='text-[16px]'>
                Step 1
              </div>
          </div>
  
          <TextInput label='Job Title' onChange={handleOnChange} name="jobTitle" placeholder='ex. UX UI Designer' validate={validate} required/>
  
          <TextInput label='Company Name' onChange={handleOnChange} name="companyName" placeholder='ex. Google' validate={validate} required/>
  
          <TextInput label='Industry' onChange={handleOnChange} name="industry"  placeholder='ex. Information Technology' validate={validate} required/>
  
  
          <div className='flex gap-[24px] text-[14px]'>
  
            <TextInput label='Location' onChange={handleOnChange} name="location" placeholder='ex. Chennai'/>
  
            <TextInput label='Remote Type' onChange={handleOnChange} name="remoteType" placeholder='ex. In-Office'/>
              
          </div>
  
      </Stack>
    )
  }


{/* Step 2 Form */}

const FormTwo: React.FC<FormProps> = (props) => {

    const { handleOnChange } = props;
  
    return (
        <Stack className='flex flex-col gap-[24px] justify-end'>
  
              <div className='flex justify-start items-center'>
                  <div className='text-[20px] flex-[50%]'>
                    Create a job
                  </div>
                  <div className='text-[16px]'>
                    Step 2
                  </div>
              </div>
  
              <div className='flex gap-[24px] text-[14px]'>
  
                  <TextInput label='Experience' onChange={handleOnChange} type="number" name="minExperience" placeholder='Minimum'/>
                  <TextInput onChange={handleOnChange} name="maxExperience" type="number" placeholder='Maximum' selfEnd/>
  
              </div>
  
              <div className='flex gap-[24px] text-[14px]'>
  
                <TextInput label='Salary' onChange={handleOnChange} type="number" name="minSalary" placeholder='Minimum'/>
                <TextInput onChange={handleOnChange} name="maxSalary" type="number" placeholder='Maximum' selfEnd/>
  
              </div>
  
              <TextInput label='Total Employees' onChange={handleOnChange} name="totalEmployees" placeholder='ex. 100-200'/>
  
  
              <div className='flex flex-col gap-[4px] text-[14px]'>
                  <label>Apply Type</label>
                  <div className='flex gap-[16px] items-center'>
  
                    <Radio name="applyType" onChange={handleOnChange} label="Quick Apply" value={1}/>
                    <Radio name="applyType" onChange={handleOnChange} label="External Apply" value={2}/>
  
                  </div>
              </div>
                          
        </Stack>
    )
  }


export default App;