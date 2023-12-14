use strict;
use warnings;

# Sub-task: Create subroutine 'get_date_from_filename'
sub get_date_from_filename {
    my ($filename) = @_;
    $filename =~ /(\d{4}-\d{2}-\d{2})/;
    return $1;
}

# Sub-task: Create subroutine 'slurp_file'
sub slurp_file {
    my ($filename) = @_;
    local $/;
    open my $fh, '<', $filename or die "Could not open file '$filename': $!";
    my $contents = <$fh>;
    close $fh;
    return $contents;
}

# Sub-task: Create subroutine 'contains_inactive_coauthors'
sub contains_inactive_coauthors {
    my ($contents) = @_;
    return $contents =~ /#+\s*Inactive Co-Authors/i;
}

# Sub-task: Create subroutine 'contains_active_coauthors'
sub contains_active_coauthors {
    my ($contents) = @_;
    return $contents =~ /#+\s*Active Co-Authors/i;
}

# Sub-task: Create subroutine 'contains_session_date'
sub contains_session_date {
    my ($contents) = @_;
    return $contents =~ /#+\s*Session Date/i;
}

# Sub-task: Create subroutine 'delete_inactive_coauthors'
sub delete_inactive_coauthors {
    $_[0] =~ s/(#+\s*Inactive Co-Authors.*?)(?=#+\s*\w)/\n/si;
}

# Sub-task: Create subroutine 'normalize_coauthor_heading'
sub normalize_coauthor_heading {
    $_[0] =~ s/#+\s*.*?Co-Author.*/## Co-Authors/gi;
}

# Sub-task: Create subroutine 'cleanup_file'
sub cleanup_file {
    my ($filename) = @_;
    my $original_contents = slurp_file($filename);
    my $contents = $original_contents;
    my $date_as_string = get_date_from_filename($filename);

    # Add session date if not present
    $contents = "## Session Date: $date_as_string\n\n$contents" unless contains_session_date($contents);

    # Delete inactive coauthors if necessary
    delete_inactive_coauthors($contents) if contains_active_coauthors($contents) && contains_inactive_coauthors($contents);

    # Normalize coauthor headings
    normalize_coauthor_heading($contents);

    if ($contents eq $original_contents) {
        print "No changes were needed for $filename\n";
    } else {
        print "Changes were made to $filename\n";
        my ($mode, $atime, $mtime) = (stat $filename)[2, 8, 9];
        my $new_filename = $filename . '.new';
        open my $fh, '>', $new_filename or die "Could not open file '$new_filename': $!";
        print $fh $contents;
        close $fh;
        chmod $mode & 07777, $new_filename;
        utime $atime, $mtime, $new_filename;
        
        # File manipulation
        rename $filename, $filename . '.original';
        rename $new_filename, $filename;

        print "You can view changes by issuing this command:\n";
        print "diff -u " . $filename . ".original " . $filename . "\n";
    }
}

# Sub-task: Create subroutine 'main'
sub main {
    foreach my $filename (@ARGV) {
        cleanup_file($filename);
    }
}

# Call main
main() if @ARGV;
