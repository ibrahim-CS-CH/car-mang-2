import DatePickerProvider, {
  DaySlots,
  Header,
  WeekDays,
} from "headless-react-datepicker";
import "headless-react-datepicker/dist/styles.css";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

export default function DatePicker(
  props: React.ComponentProps<typeof DatePickerProvider>
) {
  return (
    <DatePickerProvider {...props}>
      <div className="w-[250px] h-[250px] p-2 text-xs">
        <Header
          rightIcon={<ChevronRightIcon size={18} />}
          leftIcon={<ChevronLeftIcon size={18} />}
        />
        <WeekDays className="p-1" />
        <DaySlots slotClassName="p-1" />
      </div>
    </DatePickerProvider>
  );
}
