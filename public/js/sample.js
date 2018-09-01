const sampleXML = `
<bnml top_margin="50" bottom_margin="50" left_margin="60" right_margin="60" line_height="70" char_spacing="4">
    <identification>
        <!-- These show up in the properties of the pdf file. -->
        <work-title>Title</work-title>
        <author type="composer">Composer</author>
        <subject>Subject</subject>
    </identification>
    <defaults>
        <page-layout>
            <!-- How far the lyrics are below a line of neumes. -->
            <lyric-y-offset>25</lyric-y-offset>
            <!-- Other page sizes are: legal and A4, but this has bugs. For now use letter size -->
            <paper-size>letter</paper-size>
        </page-layout>
        <!-- Default neume font family, size, color, etc. For now you're stuck with Kassia Tsak Main, but you can change the size and color. -->
        <neume-font font_family="Kassia Tsak Main" font_size="30" color="#000000" />
        <!-- Change font_family -->
        <lyric-font font_family="Alegreya-Medium" font_size="14" color="#000000" />
        <!-- Same as the lyric-font instructions -->
        <dropcap-font font_family="Alegreya-Bold" font_size="45" color="#cf232b" />
        <!-- Same. See ReportLab documentation for more paragraph options (like first_line_indent). -->
        <paragraph-font font_family="Alegreya-Medium" font_size="14" color="#000000" align="left" first_line_indent="0"/>
    </defaults>

    <!-- Titles are a lot like paragraphs, but they are centered by default. Underneath the hood they are simple strings, meaning they don't have all the options that 'paragraph' has  -->
    <title font_family="Alegreya SC-Bold" font_size="30" color="#0000e6">
        Title
    </title>

    <!-- Here is an example of a title using paragraph. Default settings come from paragraph-font above. -->
    <paragraph align="center" font_size="16" color="#0000e6">
        First Mode
    </paragraph>

    <!-- Here's the main martyria signature. -->
    <paragraph align="center" color="#cf232b">
        Mode
        <font font_family="Kassia Tsak Martyria" font_size="30">i</font>
        Πα
        <font font_family="Kassia Tsak Fthora" font_size="18">œ</font>
    </paragraph>

    <!-- To make this paragraph inline with the one above it, we use a negative top margin. Eventually we'll find a better way to do this. -->
    <paragraph align="right" color="#cf232b" top_margin="-45">
        <font font_family="Kassia Tsak Martyria" font_size="30">v</font>
        84
    </paragraph>

    <paragraph align="right" color="#0000e6">
        Name
    </paragraph>

    <troparion>
        <neumes>
            / 0 ; 0 ! 1 Z n ! ! ! l
        </neumes>
        <!-- Any time you want to specify some nuemes that have an attribute different than the defaults at the top of this file, you'll need to specify them like this. Here we use a different font for time symbols (gorgon) and we're making it red. -->
        <neumes font_family="Kassia Tsak Chronos" color="#cf232b">
            P
        </neumes>
        <dropcap>
            L
        </dropcap>
        <!-- You can break the text into lines if it makes it easier to read. Kassia doesn't care. Here I start a new line whenever there's a martyria. -->
        <lyrics>
            Ly - - - - rics _ _
        </lyrics>
    </troparion>

</bnml>
`;

exports.sampleXML = sampleXML;