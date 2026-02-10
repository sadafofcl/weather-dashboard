export default function ErrorState({ error }: { error: string }){

    return (
      <p className="text-center text-red-600 dark:text-red-400 p-6 sm:p-8">
        {error}
      </p>
    );
} 