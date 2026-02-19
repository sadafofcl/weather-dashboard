export default function EmptyState({ message }: { message: string }){
   return (
    <p className="text-center text-gray-600 dark:text-gray-400 p-6 sm:p-8">
        {message}
    </p>
    )
}