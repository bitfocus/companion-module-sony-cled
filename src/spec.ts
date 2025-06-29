export type CommandSpec = [
	string,  // Setting Name
	string,  // Item Name
	string,  // ID
	string,  // Command
	boolean, // Default
	string   // Preset Label
];

export function getCommandList(): CommandSpec[] {
	return [
		// [SettingName, ItemName, ID, Command, Default, Preset Label]
		['System Power', 'Power ON', 'system_on', 'power "on"', true, 'CLED\nPower ON'],
		['System Power', 'Standby', 'system_off', 'power "off"', false, 'CLED\nPower OFF'],
		['Cabinet Power', 'OFF', 'unit_off', 'unit_power "off"', false, 'CLED\nCabinet ON'],
		['Cabinet Power', 'ON', 'unit_on', 'unit_power "on"', true, 'CLED\nCabinet OFF'],
		['Blank', 'OFF', 'blank_off', 'blank "off"', false, 'CLED\nBlank OFF'],
		['Blank', 'ON', 'blank_on', 'blank "on"', true, 'CLED\nBlank ON'],
		['Input', 'DisplayPort (Single1)', 'dp1', 'input "dp1"', false, 'CLED\nInput DP1'],
		['Input', 'DisplayPort (Single2)', 'dp2', 'input "dp2"', false, 'CLED\nInput DP2'],
		['Input', 'DisplayPort (Dual)', 'dp1_2', 'input "dp1_2"', false, 'CLED\nInput DP Dual'],
		['Input', 'HDMI1', 'hdmi1', 'input "hdmi1"', true, 'CLED\nInput HDMI1'],
		['Input', 'HDMI2', 'hdmi2', 'input "hdmi2"', false, 'CLED\nInput HDMI2'],
		['Color Space', 'Auto(HDMI)', 'cspace0', 'color_space "auto"', false, 'CLED\nColor Space Auto(HDMI)'],
		['Color Space', 'sRGB', 'cspace1', 'color_space "custom1"', false, 'CLED\nColor Space sRGB'],
		['Color Space', 'Native', 'cspace2', 'color_space "custom2"', true, 'CLED\nColor Space Native'],
		['Color Space', 'Adobe RGB', 'cspace3', 'color_space "custom3"', false, 'CLED\nColor Space Adobe RGB'],
		['Color Space', 'DCI_P3', 'cspace4', 'color_space "custom4"', false, 'CLED\nColor Space DCI P3'],
		['Color Space', 'BT.2020', 'cspace5', 'color_space "custom5"', false, 'CLED\nColor Space BT.2020'],
		['Color Space', 'S-Gamut', 'cspace6', 'color_space "custom6"', false, 'CLED\nColor Space S-Gamut'],
		['Color Space', 'S-Gamut3', 'cspace7', 'color_space "custom7"', false, 'CLED\nColor Space S-Gamut3'],
		['Color Space', 'S-Gamut3.Cine', 'cspace8', 'color_space "custom8"', false, 'CLED\nColor Space S-Gamut3.Cine'],
		['Color Space', 'Custom 9', 'cspace9', 'color_space "custom9"', false, 'CLED\nColor Space Custom 9'],
		['Color Space', 'Custom 10', 'cspace10', 'color_space "custom10"', false, 'CLED\nColor Space Custom 10'],
		['Transfer Matrix', 'Auto', 'tm_auto', 'transfer_matrix "auto"', true, 'CLED\nTransMatrix Auto'],
		['Transfer Matrix', 'BT.601', 'tm_bt601', 'transfer_matrix "bt601"', false, 'CLED\nTransMatrix BT.601'],
		['Transfer Matrix', 'BT.709', 'tm_bt709', 'transfer_matrix "bt709"', false, 'CLED\nTransMatrix BT.709'],
		['Transfer Matrix', 'BT.2020', 'tm_bt2020', 'transfer_matrix "bt2020"', false, 'CLED\nTransMatrix BT.2020'],
		['Gamma', '1.8', 'gmmma1', 'gamma_correction "custom1"', false, 'CLED\nGamma 1.8'],
		['Gamma', '2.2', 'gmmma2', 'gamma_correction "custom2"', true, 'CLED\nGamma 2.2'],
		['Gamma', '2.4', 'gmmma3', 'gamma_correction "custom3"', false, 'CLED\nGamma 2.4'],
		['Gamma', '2.6', 'gmmma4', 'gamma_correction "custom4"', false, 'CLED\nGamma 2.6'],
		['Gamma', 'DICOM SIM', 'gmmma5', 'gamma_correction "custom5"', false, 'CLED\nGamma DICOM SIM'],
		['Picture Mode', 'Mode1', 'picmode1', 'picture_mode "mode1"', true, 'CLED\nPicture Mode1'],
		['Picture Mode', 'Mode2', 'picmode2', 'picture_mode "mode2"', false, 'CLED\nPicture Mode2'],
		['Picture Mode', 'Mode3', 'picmode3', 'picture_mode "mode3"', false, 'CLED\nPicture Mode3'],
		['Picture Mode', 'Mode4', 'picmode4', 'picture_mode "mode4"', false, 'CLED\nPicture Mode4'],
		['Picture Mode', 'Mode5', 'picmode5', 'picture_mode "mode5"', false, 'CLED\nPicture Mode5'],
		['Picture Mode', 'Mode6', 'picmode6', 'picture_mode "mode6"', false, 'CLED\nPicture Mode6'],
		['Picture Mode', 'Mode7', 'picmode7', 'picture_mode "mode7"', false, 'CLED\nPicture Mode7'],
		['Picture Mode', 'Mode8', 'picmode8', 'picture_mode "mode8"', false, 'CLED\nPicture Mode8'],
		['HDR', 'OFF', 'hdr_off', 'hdr "off"', true, 'CLED\nHDR OFF'],
		['HDR', 'SMPTE ST 2084', 'hdr_st2084', 'hdr "st2084"', false, 'CLED\nHDR ST2084'],
		['HDR', 'SMPTE ST 2084 (Sim.)', 'hdr_st2084s', 'hdr "st2084_sim"', false, 'CLED\nHDR ST2084 Sim'],
		['HDR', 'ITU-R BT.2100 (HLG)', 'hdr_hlg', 'hdr "hlg"', false, 'CLED\nHDR HLG'],
		['HDR', 'S-Log3', 'hdr_slog3', 'hdr "slog3"', false, 'CLED\nHDR S-Log3'],
		['HDR', 'S-Log3 (Live)', 'hdr_slog3l', 'hdr "slog3_live"', false, 'CLED\nHDR S-Log3 Live'],
		['HDR', 'SMPTE ST 2084 (B/BH)', 'hdr_st2084b', 'hdr "st2084_b_series"', false, 'CLED\nHDR ST2084 (B/BH)'],
		['HDR', 'SMPTE ST 2084 (C/CH)', 'hdr_st2084c', 'hdr "st2084_c_series"', false, 'CLED\nHDR ST2084 (C/CH)'],
		['HDR HDMI Auto Setting', 'OFF', 'hdr_auto_off', 'hdr_auto_mode "off"', true, 'CLED\nHDR Auto OFF'],
		['HDR HDMI Auto Setting', 'ON', 'hdr_auto_on', 'hdr_auto_mode "on"', false, 'CLED\nHDR Auto ON'],
	];
}
