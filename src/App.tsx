import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addData, Ddelete, editData, GetData, StEdit } from './app/todoSlice'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from './components/ui/button'

const App = () => {
	const { data } = useSelector(state => state.counterSlice)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(GetData())
	}, [])

	const { register, handleSubmit, reset } = useForm()
	const [file, setFile] = useState(null)
	function handleChangeFile(e) {
		setFile(e.target.files[0])
	}

	function handleSubmitAdd(e: any) {
		const fd = new FormData()
		fd.append('Name', e.name)
		fd.append('Description', e.description)
		fd.append('Images', file)
		dispatch(addData(fd))
		reset()
	}

	function handleSubmitEdit(e) {
		e.preventDefault()
		let obj = {
			name: e.target['name'].value,
			description: e.target['description'].value,
			id: e.target['id'].value,
		}
		dispatch(editData(obj))
	}

	return (
		<>
			<Dialog>
				<DialogTrigger>
					<button>Add User</button>
				</DialogTrigger>
				<DialogContent className='bg-white'>
					<form onSubmit={handleSubmit(handleSubmitAdd)}>
						<DialogHeader>
							<DialogTitle>Add User</DialogTitle>
							<Input placeholder='Name' name='Name' {...register('Name')} />
							<Input
								placeholder='Description'
								name='Description'
								{...register('Description')}
							/>
							<Input
								type='file'
								placeholder='Images'
								name='Images'
								onChange={e => handleChangeFile(e)}
							/>
							<button type='submit'>Submit</button>
						</DialogHeader>
					</form>
				</DialogContent>
			</Dialog>
			<div className='flex flex-wrap gap-[50px]'>
				{data.map((e: any, i: number) => {
					return (
						<div
							key={i}
							className='border-[3px] text-center border-gray w-[400px] rounded-[20px] flex flex-col items-center py-[10px]'
						>
							<h1>{e.id}</h1>
							<h1>{e.name}</h1>
							<h1>{e.description}</h1>
							<img
								src={`https://to-dos-api.softclub.tj/images/${e.images[0]?.imageName}`}
								alt={`${e.name}`}
								className='h-[200px]'
							/>{' '}
							<br />
							<div className='space-y-2'>
								<button
									className='bg-blue-400 px-[38px] rounded-[10px] text-white'
									onClick={() => dispatch(Ddelete(e.id))}
								>
									delete
								</button>{' '}
								<br />
								<Dialog>
									<DialogTrigger>
										<button className='bg-red-600 px-[50px] rounded-[10px] text-white'>
											edit
										</button>
									</DialogTrigger>
									<DialogContent>
										<DialogHeader>
											<DialogTitle>Edit User</DialogTitle>
											<form onSubmit={handleSubmitEdit}>
												<Input name='name' defaultValue={e.name} />
												<Input
													name='description'
													defaultValue={e.description}
												/>
												<Input name='id' defaultValue={e.id} />
												<button type='submit'>Submit</button>
											</form>
										</DialogHeader>
									</DialogContent>
								</Dialog>{' '}
								<br />
								<button
									className='bg-green-600 px-[35px] rounded-[10px] text-white'
									onClick={() => dispatch(StEdit(e.id))}
								>
									{e.isCompleted ? 'Active' : 'InActive'}
								</button> <br />
								{''}
								<Drawer>
									<DrawerTrigger>
										<button className='bg-sky-600 px-[35px] rounded-[10px] text-white'>About</button>
									</DrawerTrigger>
									<DrawerContent className='flex flex-col items-center'>
										<DrawerHeader>
											
											<DrawerTitle>User By ID</DrawerTitle>
											<h1>{e.id}</h1>
											<h1>{e.name}</h1>
											<h1>{e.descrition}</h1>
											<img
												src={`https://to-dos-api.softclub.tj/images/${e.images[0]?.imageName}`}
												alt={`${e.name}`}
												className='h-[200px] w-[500px]'
											/>{' '}
										</DrawerHeader>
										<DrawerFooter>

											<DrawerClose>
												<Button variant='outline'>Cancel</Button>
											</DrawerClose>
										</DrawerFooter>
									</DrawerContent>
								</Drawer>
							</div>
						</div>
					)
				})}
			</div>
		</>
	)
}

export default App
