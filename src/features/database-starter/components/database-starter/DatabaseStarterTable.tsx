import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table/table";

type StarterRecordRow = {
  id: string;
  name: string;
  createdAt: Date;
};

type DatabaseStarterTableProps = {
  records: StarterRecordRow[];
};

function formatCreatedAtLabel(createdAt: Date) {
  return createdAt.toISOString().replace("T", " ").slice(0, 16);
}

export function DatabaseStarterTable({ records }: DatabaseStarterTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Created at</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {records.length === 0 ? (
          <TableRow>
            <TableCell className="whitespace-normal break-words" colSpan={2}>
              {/* issue #60: replace with a reusable TruncatedText component. */}
              No records yet. Add one to verify database writes.
            </TableCell>
          </TableRow>
        ) : (
          records.map((record) => (
            <TableRow key={record.id}>
              <TableCell className="whitespace-normal break-words">
                {record.name}
              </TableCell>
              <TableCell>{formatCreatedAtLabel(record.createdAt)}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
