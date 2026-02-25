import { Button } from "@/components/ui/button"

const ErrorDialog = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="dark bg-muted absolute rounded-lg flex-col items-center text-center justify-center text-white p-4 md:p-6">
      <h2 className="text-2xl font-bold pb-4">Error</h2>
      <hr className="pb-4" />
      <p className="text-md pb-4">{message.message}</p>
      <Button onClick={onClose} variant="default" className="rounded cursor-pointer">Close</Button>
    </div>
  )
}

export default ErrorDialog
